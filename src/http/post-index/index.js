const ytdl = require("ytdl-core");
const arc = require("@architect/functions");
const parseBody = arc.http.helpers.bodyParser;

exports.handler = async function http(req) {
  let body = parseBody(req);
  console.log(body);

  try {
    // if (!body) throw new Error(600);
    // let info = await ytdl.getInfo(
    //   "https://www.pornhub.com/view_video.php?viewkey=ph5f43314708e7e"
    // );
    let info = await ytdl.getInfo("jbGRowa5tIk");
    info = info.formats;
    let containsAudio;
    containsAudio = info.filter((key) => key.container === "mp4");
    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json; charset=utf8",
      },
      body: JSON.stringify(containsAudio),
    };
  } catch (e) {
    console.error(e.message);
    let error = {
      error: "Something blew up. Sorry.",
    };
    return {
      headers: {
        "content-type": "application/json; charset=utf8",
      },
      body: JSON.stringify(error),
      statusCode: 400,
    };
  } finally {
    // Save request data here
  }
};
