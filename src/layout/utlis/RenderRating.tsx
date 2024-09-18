import { StarFill, StarHalf, Star } from "react-bootstrap-icons";

const renderRating = (diem: number) => {
    const stars = [];
    const fullStars = Math.floor(diem); // Số sao đầy(trả về số nguyên nhỏ nhất )
    const hasHalfStar = diem % 1 >= 0.5; // Kiểm tra có sao nửa đầy không

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars.push(<StarFill key={i} className="text-warning" />);
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars.push(<StarHalf key={i} className="text-warning" />);
        } else {
            stars.push(<Star key={i} className="text-secondary" />);
        }
    }
    return stars;
}

export default renderRating;
