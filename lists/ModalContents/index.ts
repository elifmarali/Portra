interface IModalContent {
  title: string;
  content: string;
  complatedButtonText: string;
  cancelButtonText: string;
}

export const ModalContents: Record<string, IModalContent> = {
  privacyPolicy: {
    title: "Gizlilik Politikası",
    content:
      "Kişisel verileriniz, yalnızca Portra platformu hizmetlerini sunmak ve deneyiminizi iyileştirmek amacıyla kullanılacaktır. " +
      "Bilgileriniz KVKK ve GDPR düzenlemelerine uygun olarak saklanır ve üçüncü taraflarla paylaşılmaz.\n" +
      "Detaylı bilgi için Gizlilik Politikası sayfamızı ziyaret edebilirsiniz. ",
    complatedButtonText: "Onaylıyorum",
    cancelButtonText: "İptal",
  },
  termOfUse: {
    title: "Kullanım Koşulları",
    content:
      "Portra platformunu kullanarak; telif haklarına, topluluk kurallarına ve içerik politikalarına uyacağınızı kabul etmiş olursunuz. " +
      "Paylaştığınız içeriklerden siz sorumlusunuz ve platformumuz bu içerikleri yalnızca sergilemek amacıyla kullanır.\n" +
      "Ayrıntılar için Kullanım Koşulları sayfamızı ziyaret edebilirsiniz. ",
    complatedButtonText: "Okudum, Kabul Ediyorum",
    cancelButtonText: "İptal",
  },
  explorePermission: {
    title: "Keşfette Görünürlük Onayı",
    content:
      "Portfolyonuzun Keşfet bölümünde görünmesini ister misiniz?\n" +
      "Bu seçenek, çalışmalarınızın ve yeteneklerinizin daha fazla kişi tarafından görülmesini sağlar.\n" +
      "Tercihinizi istediğiniz zaman ayarlar bölümünden değiştirebilirsiniz. ",
    complatedButtonText: "Kabul Ediyorum",
    cancelButtonText: "İptal",
  },
};
