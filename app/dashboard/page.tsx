import { Button } from "@/components/ui/button";
import { deleteHaiku, getHaikus } from "@/server/actions/haikuController";
import { isAuthentic } from "@/server/modules/auth";
import Link from "next/link";
import { Suspense } from "react";

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
  const user = await isAuthentic();

  const haikus = await getHaikus();

  return (
    <div className="flex flex-col items-center  mt-6 ">
      <div className="grid grid-cols-3 gap-8">
        {haikus.data.length > 0 ? (
          haikus.data.map((haiku, index) => (
            <div key={haiku._id.toString() + index} className="py-3 w-[250px]">
              <p>{haiku.line1}</p>
              <p>{haiku.line2}</p>
              <p>{haiku.line3}</p>
              <br />
              {/* @ts-ignore  */}
              {user.id === haiku.author.toString() && (
                <div className="flex items-center gap-4">
                  <Button asChild size="sm">
                    <Link href={`/edit-haiku/${haiku._id.toString()}`}>
                      Edit
                    </Link>
                  </Button>
                  <form action={deleteHaiku}>
                    <input
                      type="hidden"
                      name="id"
                      defaultValue={haiku._id.toString()}
                    />
                    <Button size="sm" className="text-white bg-red-500 hover:bg-red-400">Delete</Button>
                  </form>
                </div>
              )}
            </div>
          ))
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
