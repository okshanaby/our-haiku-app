import { getHaikus } from "@/server/actions/haikuController";
import { isAuthentic } from "@/server/modules/auth";
import { Suspense } from "react";
import Haiku from "./haiku";

const DashboardPage = () => {
  return (
    <div>
      <h2 className="text-center text-2xl text-gray-600">Your Haikus</h2>
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <HaikuList />
      </Suspense>
    </div>
  );
};

const HaikuList = async () => {
  const haikus = await getHaikus();
  const user = await isAuthentic();

  return (
    <div className="flex flex-col items-center  mt-6 ">
      <div className="">
        {haikus.data.length > 0 ? (
          haikus.data.map((haiku, index) => {
            haiku._id = haiku._id.toString();
            haiku.author = haiku.author.toString();
            return <Haiku haiku={haiku} user={user} key={index} />;
          })
        ) : (
          <p>No haikus, please create one</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

// const DeleteForm = ()=> {
//   return ()
// }
