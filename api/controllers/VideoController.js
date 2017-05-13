/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const async = require('async');
const request = require('request');
const url = require('url');
const YOUTUBE_API_KEY = 'AIzaSyCG9J1QS_RouELyvRHo_rDdcPcGB1ZpXxk';

module.exports = {

  ':video_id/edit': (req, res) => {
    Video.findById(req.params.video_id, (error, video) => {
      let options = {
        video: video[0],
        user: req.user || { name: 'guest', id: -1 }
      };
      console.log(options);
      res.view('videoEdit', options);
    });
  },
  'search': (req, res) => {
    Video.findOneByLink(req.query.videoUrl, (error, video) => {
      if (error) return res.json(error);
      if (video) return res.redirect(`/video/${video.id}/edit`);
      Video.create({
        link: req.query.videoUrl,
      }, (error, video) => {
        return res.redirect(`/video/${video.id}/edit`);
      });
    });
  },
  'find': (req, res) => {
    Video.find(req.query, (error, videos) => {
      let funs = videos.map((video) => {
        return (callback) => {
          let youtubeId = url.parse(video.link, { search: true }).query['v'];
          let youtubeUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeId}&fields=items/snippet/title,items/snippet/description&key=${YOUTUBE_API_KEY}`;

          request(youtubeUrl, { json: true }, (error, response, body) => {
            let additionalData = {};
            if (body.items && body.items[0]) {
              additionalData = {
                youtubeData: body.items[0].snippet
              };
            }
            callback(error, Object.assign(video, additionalData));
          });
        };
      });
      async.parallel(funs, (error, results) => {
        res.json(results);
      });
    });

  },
};

