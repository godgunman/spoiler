/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
};

