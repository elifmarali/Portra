export const loginNavbarShortcut: INavbarShortcut[] = [
    {
        name:"Hakkımızda",
        path:"/about"
    },
    {
        name: "Keşfet",
        path:"/explore"
    },
    {
        name:"İletişim",
        path:"/contact"
    }
];

interface INavbarShortcut{
    name:string,
    path:string
}

{
  /* Kullanıcı giriş yapmadıysa gözükecek */
}

{
  /* 
    Giriş Yap (/login) : E-posta / şifre ile giriş
    Sosyal medya ile giriş (opsiyonel)
    Şifre unuttum bağlantısı
  */
}

{
  /* 
   Kayıt Ol (/register) 
   İsim, e-posta, şifre, portfolyom keşfette gösterilsin mi checkbox'ı ,Kullanım koşulları onayı 
  */
}

{
  /* 
    Hakkımızda (/about)  
    Portra’nın hikayesi, amacı. Geliştirici / ekip hakkında bilgi (isteğe bağlı) 
  */
}

{
  /* 
    Keşfet (/explore) 
    Diğer kullanıcıların portfolyolarını listeleyip ilham alınabilecek bir alan 
  */
}
{
  /* 
    İletişim (/contact)
    Kullanıcılar veya ziyaretçiler soru sorabilir, geri bildirim verebilir.
    Basit bir iletişim formu: İsim, e-posta, mesaj.
    Opsiyonel: iletişim e-posta adresi, sosyal medya linkleri.
  */
}
