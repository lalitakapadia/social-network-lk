

function dateFormat(timestamp) {

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };

    //format the date as MM/DD/YYYY
    return `${new Date(timestamp).toLocaleDateString(undefined, options)}`;
}

module.exports = dateFormat;