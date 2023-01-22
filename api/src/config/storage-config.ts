import { diskStorage } from 'multer';
import { extname } from 'path';

export const storage = diskStorage({
  destination: './public/uploads',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file, 15));
  },
});

export const storageUser = diskStorage({
  destination: './public/uploads',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file, 15, 'user_'));
  },
});

function generateFilename(file, len, prefix = '') {
  const char = 'AZERTYUIOPQSDFGHJKLMWXCVBNazertyuiopqsdfghjklmwxcvbn';
  var output = prefix;
  let extension = '';
  for (let i = 0; i < len; i++) {
    output += char.charAt(Math.floor(Math.random() * char.length));
  }

  if (file.mimetype === 'image/png') {
    extension = '.png'
  } else {
    extension = '.jpg'
  }
  return `${output}${Date.now()}${extension}`;
}
