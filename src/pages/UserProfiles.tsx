import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";

export default function UserProfiles() {
  return (
    <div className="bg-[#dad7cd] p-6">
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-[#a3b18a] bg-white p-5">
        <h3 className="mb-5 text-lg font-semibold text-[#344e41]">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
          <UserAddressCard />
        </div>
      </div>
    </div>
  );
}
