import * as yup from "yup";

export const createPortfolioValidation = yup.object({
  // Step1
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
    .string()
    .required("Profil fotoğrafı zorunludur")
    .test("is-valid-base64", "Geçersiz görsel formatı", (value) => {
      if (!value) return false;

      const isBase64 =
        value.startsWith("data:image/jpeg;base64,") ||
        value.startsWith("data:image/png;base64,");
      return isBase64;
    })
    .test("base64-size", "Dosya boyutu en fazla 2MB olmalıdır", (value) => {
      if (!value) return false;

      const sizeInBytes =
        Math.ceil((value.length * 3) / 4) -
        (value.endsWith("==") ? 2 : value.endsWith("=") ? 1 : 0);
      return sizeInBytes <= 2 * 1024 * 1024;
    }),
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

  // Step2

  country: yup
    .object({
      id: yup.number(),
      name: yup.string(),
    })
    .required("Ülke seçimi zorunludur"),
  city: yup
    .object({
      id: yup.number(),
      name: yup.string(),
      country_id: yup.number(),
    })
    .required("İl alanı zorunludur"),
  district: yup
    .object({
      id: yup.number(),
      name: yup.string(),
      city_id: yup.number(),
    })
    .required("İlçe alanı zorunludur"),

  // Step3
  jobs: yup
    .array()
    .min(1, "En az 1 meslek seçilmelidir")
    .required("Meslek alanı zorunludur"),
  otherJob: yup.string().when("jobs", (jobs, schema) => {
    const hasOther =
      Array.isArray(jobs[0]) && jobs[0].some((job) => job.id === 0);
    return hasOther
      ? schema.required("Diğer meslek alanı zorunludur")
      : schema.notRequired();
  }),
  skills: yup
    .array()
    .of(
      yup
        .string()
        .max(50, "Her bir yetenek max 50 karakter olmalıdır")
        .required("Yetenek boş olmaz")
    )
    .min(1, "En az 1 yetenek eklenmelidir")
    .required("Yetenek zorunludur"),
  languages: yup
    .array()
    .of(
      yup.object({
        id: yup.number().required(),
        name: yup.string().required("Dil zorunludur"),
        level: yup.string().required("Seviye zorunludur"),
      })
    )
    .min(1, "En az bir dil bilgisi eklenmelidir")
    .required("Dil bilgisi zorunludur"),
  certificates: yup
    .array()
    .of(
      yup.object({
        id: yup.number(),
        title: yup
          .string()
          .min(3, "Başlık minimum 3 karakter uzunlukta olmalıdır")
          .max(30, "Başlık maximum 30 karakter uzunlukta olmalıdır")
          .required("Başlık alanı zorunludur"),
        companyName: yup
          .string()
          .min(3, "Kurum adı minimum 3 karakter uzunlukta olmalıdır")
          .max(30, "Kurum adı maximum 30 karakter uzunlukta olmalıdır")
          .required("Kurum adı alanı zorunludur"),
        date: yup.date().required("Tarih alanı zorunludur"),
      })
    )
    .min(1, "En az 1 sertifika eklenmelidir")
    .required("En az 1 sertifika eklenmelidir"),
});
