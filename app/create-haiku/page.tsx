import HaikuForm from "@/components/form/haiku-form";
import { isAuthentic } from "@/server/modules/auth";

const CreateHaikuPage = async () => {
  await isAuthentic();

  return (
    <div className="container mx-auto px-6">
      <div className="flex items-center justify-center min-h-">
        <div className="w-full max-w-md">
          <h1 className="text-3xl text-center">Create Haiku</h1>
          <HaikuForm action="create" />
        </div>
      </div>
    </div>
  );
};

export default CreateHaikuPage;
