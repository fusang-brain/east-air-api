
import {filterParams} from '../../utils/filters';

export default async function (req, params, ctx) {
  const { services, response } = ctx;
  const { VideoId, EventType, Status, ...others } = req.body;
  console.log("视频回调...", req.body);
  if (Status === "fail") {
    return {
      code: response.getSuccessCode('update'),
      message: '修改成功',
    }
  }
  if (String(EventType) === 'StreamTranscodeComplete') {
    const { VideoId, Definition, Duration, FileUrl } = others;
    await services.vod.finishedVideo(VideoId, { filterUrl: FileUrl, duration: Duration, definition: Definition});
  }
  if (String(EventType) === 'SnapshotComplete') {
    const { VideoId, CoverUrl } = others;
    await services.vod.finishedVideo(VideoId, { cover: CoverUrl }) ;
  }

  // await services.article.update(args.id, args);

  return {
    code: response.getSuccessCode('update'),
    message: '修改成功',
  }
}
