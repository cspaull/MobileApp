# MuseumCompa Application

Ứng dụng được phát triển bằng React Native và Expo. Dưới đây là hướng dẫn chi tiết để khởi chạy và xây dựng ứng dụng.

## 🚀 Hướng dẫn khởi chạy nhanh (Dùng Expo Go)

Đây là cách đơn giản nhất để xem ứng dụng trực tiếp trên điện thoại cá nhân mà không cần thiết lập môi trường lập trình phức tạp.

1.  **Chuẩn bị điện thoại:** Cài đặt ứng dụng **Expo Go** từ Google Play Store (Android) hoặc App Store (iOS).
2.  **Kết nối mạng:** Đảm bảo điện thoại và máy tính của bạn đang kết nối **cùng một mạng Wi-Fi**.
3.  **Cài đặt thư viện:** Mở terminal tại thư mục `D:\museumcompa` và chạy:
    ```bash
    npm install
    ```
4.  **Khởi động máy chủ:**
    ```bash
    npm run start
    ```
5.  **Quét mã QR:**
    * Sau khi lệnh chạy xong, một mã QR sẽ xuất hiện trên terminal.
    * Mở app **Expo Go** trên điện thoại.
    * **Android:** Chọn "Scan QR Code" và quét mã trên màn hình.
    * **iOS:** Sử dụng ứng dụng Camera mặc định để quét mã.

---

## 🛠 Chạy Native Android (Emulator/Device)

Dành cho trường hợp bạn muốn chạy trên máy ảo hoặc can thiệp sâu vào phần cứng.

1.  **Cài đặt công cụ:** Cài đặt Android Studio và Android SDK.
2.  **Tạo máy ảo:** Thiết lập một Emulator (máy ảo) thông qua Device Manager trong Android Studio.
3.  **Biến môi trường:** Đặt biến môi trường `ANDROID_HOME` trỏ tới thư mục SDK.
    * *Ví dụ:* `C:\Users\<YourName>\AppData\Local\Android\Sdk`
4.  **Chạy ứng dụng:**
    ```bash
    npm run android:native
    ```

---

## 📦 Hướng dẫn Build file APK

Để đóng gói ứng dụng thành file cài đặt độc lập (.apk):

1.  **Tiền xây dựng (Prebuild):**
    ```bash
    npm run prebuild:android
    ```
2.  **Truy cập thư mục android:**
    ```bash
    cd android
    ```
3.  **Biên dịch file APK:**
    ```powershell
    .\gradlew assembleRelease
    ```
4.  **Vị trí file sau khi build:**
    `android\app\build\outputs\apk\release\app-release.apk`

---

## 📝 Danh sách Script (package.json)

* `npm run start`: Chạy server Expo.
* `npm run android`: Chạy trên Android (Expo).
* `npm run android:native`: Chạy dưới dạng native Android.
* `npm run prebuild:android`: Tạo thư mục native android từ project Expo.
* `npm run test`: Chạy các bản kiểm thử (unit tests).

---
*© 2024 MuseumCompa Project*
