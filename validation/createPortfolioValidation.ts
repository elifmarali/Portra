import * as yup from "yup";

export const createPortfolioValidation = yup.object({
  name: yup
    .string()
    .min(3, "Ad minimum 3 karakter uzunlukta olmalıdır")
    .max(30, "Ad maximum 30 karakter uzunlukta olmalıdır")
    .required("Ad zorunludur"),
  surname: yup
    .string()
    .min(3, "Soyad minimum 3 karakter uzunlukta olmalıdır")
    .max(30, "Soyad maximum 30 karakter uzunlukta olmalıdır")
    .required("Soyad zorunludur"),
  title: yup
    .string()
    .min(3, "Başlık / Unvan  minimum 3 karakter uzunlukta olmalıdır")
    .max(30, "Başlık / Unvan maximum 30 karakter uzunlukta olmalıdır")
    .required("Başlık / Unvan zorunludur"),
  photo: yup
    .mixed() // Her türlü veri tipi olabilir (ör: file, undefined, null vb.)
    .required("Profil fotoğrafı zorunludur")
    .test("fileSize", "Dosya boyutu en fazla 2MB olmalı", (value) =>
      value instanceof File ? value.size <= 2 * 1024 * 1024 : false
    )
    .test("fileType", "Sadece JPG veya PNG dosyası yüklenebilir", (value) =>
      value instanceof File
        ? ["image/jpeg", "image/png"].includes(value.type)
        : false
    ),
  shortBiography: yup
    .string()
    .min(30, "Kısa biyografi minimum 30 karakter uzunlukta olmalıdır")
    .max(300, "Kısa biyografi maximum 300 karakter uzunlukta olmalıdır")
    .required("Kısa biyografi zorunludur"),
  email: yup
    .string()
    .email("Geçerli bir email girilmelidir")
    .min(3, "Email minimum 3 karakter uzunlukta olmalıdır")
    .max(30, "Email maximum 30 karakter uzunlukta olmalıdır")
    .required("Email zorunludur"),
});
