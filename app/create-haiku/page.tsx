import HaikuForm from "@/components/form/haiku-form";
import { isAuthentic } from "@/server/modules/auth";

const CreateHaikuPage = async () => {
  await isAuthentic();

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center">
        {
          <div className="w-[30%]">
            <h1 className="text-3xl">Create Haiku</h1>
            <HaikuForm />
          </div>
        }
      </div>
    </div>
  );
};

export default CreateHaikuPage;
