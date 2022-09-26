
export const validateAlbum = (albumData) => {
    const items = [
        'name',
        'imgUrl',
        'price',
        'releaseDate',
        'artist',
        'genre',
        'description'
    ];

    return items.some(a => !albumData[a]);
};