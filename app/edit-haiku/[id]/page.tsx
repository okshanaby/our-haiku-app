import HaikuForm from "@/components/form/haiku-form";
import { getHaikuById } from "@/server/actions/haikuController";
import { isAuthentic } from "@/server/modules/auth";
import { redirect } from "next/navigation";

const EditHaikuPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  await isAuthentic();

  const haiku = await getHaikuById(id);

  if (!haiku.success) {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center">
        {
          <div className="w-[30%]">
            <h1 className="text-3xl">Edit Haiku</h1>
            <HaikuForm action="edit" haiku={haiku} />
          </div>
        }
      </div>
    </div>
  );
};

export default EditHaikuPage;
