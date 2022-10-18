import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'react-examples',
    api_key: '159787757833777',
    api_secret: 'Wh19pWRg-ixZiO8cjxg8iShAkNw',
    secure: true
});

describe('Pruebas en el Helper fileUpload', () => {

    test('Debe de subir el archivo correctamente a cloudinary', async() => {
        const imageUrl = 'https://img.lovepik.com/photo/40006/7713.jpg_wh860.jpg';
        const imageResponse = await fetch(imageUrl);
        const blob = await imageResponse.blob();
        const file = new File([blob], 'ImagenTest.jpeg');
        const responseUrl = await fileUpload(file);
        
        expect( typeof responseUrl ).toBe( 'string' );

        const segments = responseUrl.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');
        await cloudinary.api.delete_resources([ `journal/${ imageId }` ]);
    }, 10000);

    test('Debe de retornar el error', async() => {
        const file = new File([], 'ImagenTest.jpeg');
        const responseUrl = await fileUpload(file);
        expect( typeof responseUrl ).toBe( 'string' );
    });

});