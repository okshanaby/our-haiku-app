import { Button } from "@/components/ui/button";
import { getHaikus } from "@/server/actions/haikuController";
import { isAuthentic } from "@/server/modules/auth";
import Link from "next/link";

const DashboardPage = async () => {
  const user = await isAuthentic();

  // @ts-ignore
  const haikus = await getHaikus(user.id);

  return (
    <div>
      <h2 className="text-center text-2xl text-gray-600">Your Haikus</h2>
      <div className="flex flex-col items-center  mt-6 divide-y">
        {haikus.data.length > 0 ? (
          haikus.data.map((haiku, index) => (
            <div key={haiku._id.toString() + index} className="py-3">
              <p>{haiku.line1}</p>
              <p>{haiku.line2}</p>
              <p>{haiku.line3}</p>
              <br />
              <Button asChild size="sm">
                <Link href={`/edit-haiku/${haiku._id.toString()}`}>Edit</Link>
              </Button>
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
