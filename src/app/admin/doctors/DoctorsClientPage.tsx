import { DoctorsManagement } from "@/components/admin/doctors/doctors-management";

export default function DoctorsClientPage() {
  return (
    <div className="px-6 pb-8">
      {/* Main Content with Error Boundary and Loading */}
      <div className="space-y-6">
        <DoctorsManagement />
      </div>
    </div>
  );
}
