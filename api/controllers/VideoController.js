/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  ':video_id/edit': (req, res) => {
    Video.findById(req.params.video_id, (error, video) => {
      console.log(video);
      res.view('videoEdit', {video});
    });
  },
};

