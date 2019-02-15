
export function getAssets() {
  return Promise.resolve([
    {
      id: 'barrel01',
      name: 'barrel01',
      fileName: 'barrel01.png',
      type: 'png',
      url: 'https://nemesis.app/assets/barrel01.png',
    },
    {
      id: 'barrel02',
      name: 'barrel02',
      fileName: 'barrel02.png',
      type: 'png',
      url: 'https://nemesis.app/assets/barrel02.png',
    },
    {
      id: 'barrel03',
      name: 'barrel03',
      fileName: 'barrel03.png',
      type: 'png',
      url: 'https://nemesis.app/assets/barrel03.png',
    },
  ]);
}

export function getAsset() {

}