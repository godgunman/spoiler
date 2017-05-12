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
        user: req.user || { name: 'guest' }
      };
      console.log(options);
      res.view('videoEdit', options);
    });
  },
};

