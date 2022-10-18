
export const fileUpload = async( file ) => {
    if( !file ) throw new Error('No hay archivo para subir');

    try{
        const CLOUD_URL = 'https://api.cloudinary.com/v1_1/react-examples/image/upload';

        // Subir archivos a una rest api
        const formData = new FormData();
        formData.append('upload_preset', 'react-journal');
        formData.append('file', file);

        const request = await fetch(CLOUD_URL, {
            method: 'POST',
            body: formData
        });

        if( !request.ok ){
            // throw new Error('No se pudo subir la imagen');
            return 'No se pudo subir la imagen'
        }

        const response = await request.json();
        return response.secure_url;
    }catch(error){
        throw new Error(error.message);
    }
}