const fs = require('fs');
const { exit } = require('process');

const readGradleProperties = (path) => {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch (error) {
    console.error(error);
    exit(1);
  }
};

const replaceGradleProperties = (path, properties) => {
  if (properties.includes('android.useAndroidX')) {
    properties = properties.replace('android.useAndroidX=false', 'android.useAndroidX=true')
  } else {
    properties += "android.useAndroidX=true\n";
  }

  if (properties.includes('android.enableJetifier')) {
    properties = properties.replace('android.enableJetifier=false', 'android.enableJetifier=true')
  } else {
    properties += "android.enableJetifier=true\n";
  }

  fs.writeFileSync(path, properties, 'utf8');
};

module.exports = (context) => {
  const gradlePropertiesPath = './platforms/android/gradle.properties';
  const gradleProperties = readGradleProperties(gradlePropertiesPath);
  replaceGradleProperties(gradlePropertiesPath, gradleProperties);
};