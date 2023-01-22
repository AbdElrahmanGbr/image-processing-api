# Udacity Image Processing API

This project is the first project in Udacity Full-Stack Advanced JS Nanodegree.

It is an express server made to process images located in a folder then create a resized thumb version of it, and save it on the disk. Once created a thumb version it just serves the processed image through the api endpoint.


## Built With
![TypeScript](https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=)
![ts-node](https://img.shields.io/static/v1?style=for-the-badge&message=ts-node&color=3178C6&logo=ts-node&logoColor=FFFFFF&label=)
![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![Express](https://img.shields.io/static/v1?style=for-the-badge&message=Express&color=000000&logo=Express&logoColor=FFFFFF&label=)
![Nodemon](https://img.shields.io/static/v1?style=for-the-badge&message=Nodemon&color=222222&logo=Nodemon&logoColor=76D04B&label=)
![sharp](https://img.shields.io/static/v1?style=for-the-badge&message=sharp&color=222222&logo=sharp&logoColor=99CC00&label=)
![Prettier](https://img.shields.io/static/v1?style=for-the-badge&message=Prettier&color=222222&logo=Prettier&logoColor=F7B93E&label=)
![ESLint](https://img.shields.io/static/v1?style=for-the-badge&message=ESLint&color=4B32C3&logo=ESLint&logoColor=FFFFFF&label=)
![Jasmine](https://img.shields.io/static/v1?style=for-the-badge&message=Jasmine&color=8A4182&logo=Jasmine&logoColor=FFFFFF&label=)
![Jest](https://img.shields.io/static/v1?style=for-the-badge&message=Jest&color=C21325&logo=Jest&logoColor=FFFFFF&label=)

## Installation

To install the necessary packages, run:

```bash
npm install
#or
yarn
```

## Scripts

```python
# Build:
npm run build

# Test:
npm run test

# Start:
npm run start
```

## API Reference
### Listing Index of all Available images That Can be Resized
```bash
GET /api/indexImages
```
* List of available images to be used:
    * encenadaport
    * fjord
    * palmtunnel
    * santamonica
    * icelandwaterfall

## Deployed Version
[Image-Processing-Api](https://image-processing-api-production.up.railway.app/ "Goto Deployed on Railway.app")

### Usage (Resizing Images)
```bash
GET /api/images/?filename={filename}&height={height}&width={width}
```

Query Parameter | Type | State
------------- | ------------- | -------------
filename  | string | Required. filename of the desired image to be resized
height | number | Required. desired height
width | number | Required. desired height

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.
Please make sure to update tests as appropriate.
```bash
git clone https://github.com/AbdElrahmanGbr/image-processing-api.git
```

## License

[MIT](https://choosealicense.com/licenses/mit/)