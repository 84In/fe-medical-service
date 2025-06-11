import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="px-6 py-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Bảng điều khiển trung tâm y tế
        </h1>
        <p className="text-gray-600 mb-8">
          Chào mừng đến với bảng điều khiển quản trị. Sử dụng menu điều hướng để
          quản lý cơ sở y tế của bạn.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quản lý bác sĩ */}
          <Link
            href="/admin/doctors"
            className="bg-blue-50 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              Quản lý bác sĩ
            </h2>
            <p className="text-gray-600 text-sm">
              Cập nhật thông tin bác sĩ, chuyên khoa.
            </p>
          </Link>

          {/* Quản lý dịch vụ */}
          <Link
            href={"/admin/services"}
            className="bg-green-50 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-green-800 mb-2">
              Quản lý dịch vụ
            </h2>
            <p className="text-gray-600 text-sm">
              Thêm, chỉnh sửa và phân loại các dịch vụ khám chữa bệnh hiện có.
            </p>
          </Link>

          {/* Quản lý tin tức */}
          <Link
            href={"/admin/news"}
            className="bg-yellow-50 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">
              Quản lý tin tức
            </h2>
            <p className="text-gray-600 text-sm">
              Đăng bài viết mới, chia sẻ kiến thức y tế và cập nhật hoạt động
              trung tâm.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
