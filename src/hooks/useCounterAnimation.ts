import { useState, useEffect } from 'react';

// Chuyển đổi giá trị string (ví dụ: "5,000+") thành số nguyên (5000)
const parseValue = (value: string): number => {
    // Loại bỏ dấu phẩy, "+" và các ký tự không phải số
    const cleaned = value.replace(/[+,]/g, ''); 
    return parseInt(cleaned, 10) || 0;
};

const useCounterAnimation = (endValue: string, duration: number = 1500) => {
    const [count, setCount] = useState(0);
    const targetValue = parseValue(endValue);
    const suffix = endValue.replace(parseValue(endValue).toString(), ''); // Lấy lại hậu tố (+, Top, ...)

    useEffect(() => {
        let startTime: number | null = null;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1); // Đảm bảo không vượt quá 1

            // Tính toán giá trị hiện tại (làm tròn)
            const currentValue = Math.floor(percentage * targetValue);
            setCount(currentValue);

            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                // Đảm bảo giá trị cuối cùng là giá trị đích
                setCount(targetValue); 
            }
        };

        // Bắt đầu animation
        const animationFrame = requestAnimationFrame(animate);

        // Cleanup: Dừng animation khi component unmount
        return () => cancelAnimationFrame(animationFrame);
    }, [targetValue, duration]);

    // Trả về giá trị đã định dạng (ví dụ: "5,000") kèm theo hậu tố
    const formattedCount = new Intl.NumberFormat('vi-VN').format(count) + suffix;

    return formattedCount;
};

export default useCounterAnimation;