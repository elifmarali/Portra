export const convertToBase64 = (file:File) : Promise<string> => {
    return new Promise((resolve,reject)=>{
        // FileReader, tarayıcı API'sidir ve dosya içeriğini okumaya yarar.
        const reader = new FileReader();
        // Dosyayı base64 formatında okumaya başla (Data URL).
        reader.readAsDataURL(file);

        // Okuma işlemi başarılı olduğunda bu fonksiyon tetiklenir.
        reader.onload = () => {
            // Sonuç bir string ise (yani base64 formatı), promise başarılı tamamlanır.
            if(typeof reader.result==="string"){
                resolve(reader.result);
            }else{
                reject("Dosya base64'e çevrilemedi.")
            }
        };

        reader.onerror = (error) => {
            reject(error);
        }
    })
};
