
import {filterParams} from '../../utils/filters';

export default async function (req, params, ctx) {
  const { services, response } = ctx;
  const { VideoId, EventType, Status, ...others } = req.body;
  console.log("视频回调...", req.body);
  if (String(Status) === "fail") {
    return {
      code: response.getSuccessCode('update'),
      message: '修改成功',
    }
  }
  // console.log(VideoId, "vidoeI");
  if (String(EventType) === 'StreamTranscodeComplete') {
    const { Definition, Duration, FileUrl, Format } = others;
    await services.vod.finishedVideo(VideoId, { fileUrl: FileUrl, duration: Duration, definition: Definition, format: Format});
  }
  if (String(EventType) === 'SnapshotComplete') {
    const { CoverUrl } = others;
    await services.vod.finishedVideo(VideoId, { cover: CoverUrl }) ;
  }

  // await services.article.update(args.id, args);

  return {
    code: response.getSuccessCode('update'),
    message: '修改成功',
  }
}
