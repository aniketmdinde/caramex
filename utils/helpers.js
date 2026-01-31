export const helpers = {
    uppercase: (v) => v.toUpperCase(),
    lowercase: (v) => v.toLowerCase(),
    camelCase: (v) => {
        return v.split(/[-_ ]+/).map((word, index) => {
            if (index === 0) {
                return word.toLowerCase();
              }

              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join('');
    },
    pascalCase: (v) => 
        v.split(/[-_ ]+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(''),
    kebabCase: (v) => 
        v.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/[._\s]+/g, '-')
        .toLowerCase()
}