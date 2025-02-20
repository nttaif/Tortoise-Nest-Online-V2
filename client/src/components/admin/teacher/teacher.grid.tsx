import { Teacher } from "@/types/teacher";
import { TeacherCard } from "./teacher.card";
import { ResponseListTeacherData } from "@/types/ResponseListTeacherData";

interface IProp {
  listTeacher?: ResponseListTeacherData;
}

export function TeacherGrid(props: IProp) {
  const { listTeacher } = props;

  // Kiểm tra nếu listTeacher không tồn tại hoặc danh sách rỗng
  if (!listTeacher || listTeacher.results.length === 0) {
    return <div>Không có Giảng viên nào</div>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {listTeacher.results.map((teacher) => (
        <TeacherCard key={teacher._id} teacher={teacher} />
      ))}
    </div>
  );
}
