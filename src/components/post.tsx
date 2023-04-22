import { useState, useEffect } from "react";
import {
  RuntimeConnector,
  Apps,
  ModelNames,
  FileType,
  MirrorFile,
} from "@dataverse/runtime-connector";

interface PostProps {
  runtimeConnector: RuntimeConnector;
}

const Post = (props: PostProps) => {
  const { runtimeConnector } = props;
  const [tweets, setTweets] = useState([]);
  const [did, setDid] = useState("");
  const [content, setContent] = useState<any>(null);
  const [stream, setStream] = useState([]);
  const [contentRecord, setContentRecord] = useState<
    Record<string, MirrorFile>
  >({});

  const getDID = async () => {
    const did = await runtimeConnector.getCurrentDID();
    setDid(did);
  };

  // How to tweet
  const createStream = async () => {
    try {
      const currentTime = new Date();
      console.log("content", content);
      console.log("did at Post", did);
      const { streamContent, streamId, newMirror, existingMirror } =
        await runtimeConnector.createStream({
          did,
          appName: "dapqab",
          modelName: "dapqab_post",
          streamContent: {
            appVersion: "0.1.0",
            text: content,
            createdAt: currentTime,
            updatedAt: currentTime,
          },
          fileType: FileType.Public,
        });
      console.log(streamContent);
    } catch (error) {
      console.log(error);
    }
  };

  const loadContent = async () => {
    let streams;
    // if (did) {
    //   streams = await runtimeConnector.loadStreamsByModelAndDID({
    //     did,
    //     appName: "dapqab",
    //     modelName: "dapqab_post",
    //   });
    // } else {
    streams = await runtimeConnector.loadStreamsByModel({
      appName: "dapqab",
      modelName: "dapqab_post",
    });
    // }
    setContentRecord(streams);
  };

  useEffect(() => {
    getDID();
    // getStream();
  }, []);

  return (
    <div>
      <button onClick={() => getDID}>
        {did != "" ? "got did" : "get DID"}
      </button>
      <textarea
        placeholder="Enter something."
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={() => createStream()}>Submit Post</button>
      <button onClick={() => loadContent()}>load posts</button>
      {contentRecord &&
        Object.keys(contentRecord).map((streamId) => {
          return <div>{contentRecord[streamId].content.text}</div>;
        })}
    </div>
  );
};

export default Post;
