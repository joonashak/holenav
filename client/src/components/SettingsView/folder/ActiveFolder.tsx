import PageTitle from "../../common/PageTitle";
import useUserData from "../../UserData/useUserData";

const ActiveFolder = () => {
  const { activeFolder } = useUserData();

  return (
    <>
      <PageTitle>Active Folder</PageTitle>
      {activeFolder}
    </>
  );
};

export default ActiveFolder;
