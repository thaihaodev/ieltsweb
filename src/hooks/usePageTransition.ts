import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTransition = (delayMs: number = 500) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(location.pathname);

  useEffect(() => {
    // Chỉ chạy khi đường dẫn thay đổi
    if (location.pathname !== key) {
      setLoading(true); // Bắt đầu loading
      
      // Tạo độ trễ
      const timer = setTimeout(() => {
        setLoading(false); // Kết thúc loading sau delay
        setKey(location.pathname); // Cập nhật key để render trang mới
      }, delayMs);

      return () => clearTimeout(timer); // Cleanup timer khi component unmount hoặc path thay đổi
    }
  }, [location.pathname, key, delayMs]);

  return { loading, displayKey: key };
};

export default usePageTransition;