//class SachModel để lấy cac thuộc tính của sách từ server
interface Book {
    id: number;
    title: string;
    description: string;
    originalPrice: number;
    price: number;
    imageURL: string;
}
export default Book;