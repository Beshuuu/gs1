export const isGtinInvalid = gtin => {
    if (!gtin) {
        return false;
    }

    if (isNaN(gtin)) {
        return true;
    }

    // Check if length of GTIN is valid
    const gtinLengths = [8, 12, 13, 14]
    if (!gtinLengths.includes(gtin.length)) {
        return true;
    }

    const splitGtin = gtin.split('');

    // User provided check digit
    const checkDigit = splitGtin.pop();

    // Default multipliers based of GTIN-14
    const gtinMultipliers = [3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3];

    // Starting index point in gtinMultipliers based off length of GTIN
    const indexDiff = gtinMultipliers.length - splitGtin.length;

    // Check digit calculation
    const multipliedGtin = splitGtin.map((digit, index) => digit * gtinMultipliers[index + indexDiff]);
    const sum = multipliedGtin.reduce((partialSum, currentValue) => partialSum + currentValue, 0);
    const calculatedCheckDigit = (Math.round(sum / 10) * 10) - sum;

    // Compare calculated check digit against provided checkdigit
    return calculatedCheckDigit.toString() !== checkDigit;
};


export const isProductNameInvalid = productName => {
    return !productName.replace(/\s/g, '');
};

export const isProductDescriptionInvalid = productDescription => {
    const splitProductDescription = productDescription.split(" ").filter(text => !!text);
    if (!productDescription.replace(/\s/g, '')) { return true }
    return splitProductDescription.length < 2
};

export const isBrandInvalid = (brand, productName) => {
    if (!brand.replace(/\s/g, '')) { return true }
    return brand === productName.value;
};
