/* The script is deployed as a web app and renders the form */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index.html')
    .setSandboxMode(HtmlService.SandboxMode.NATIVE)
    .setTitle('Form Upload BAP');
  // This is important as file upload fail in IFRAME Sandbox mode.
}

/* This function will process the submitted form */
function uploadFiles(form) {
  var dApp = DriveApp;
  var semester = 'GENAP 18/19';
  try {
    var firstFolderName = 'PRESENSI PRAKTIKUM ' + semester; // PRESENSI PRAKTIKUM GENAP 18/19
    var firstLevelFolderIter = dApp.getFoldersByName(firstFolderName);
    var firstLevelFolder = firstLevelFolderIter.hasNext()
      ? firstLevelFolderIter.next()
      : dApp.createFolder(firstFolderName);

    var secondLevelFolderName = '[' + semester + '] ' + form.praktikum; // --[GENAP 18/19] PBO
    var secondLevelFolderIter = dApp.getFoldersByName(secondLevelFolderName);
    var secondLevelFolder = secondLevelFolderIter.hasNext()
      ? secondLevelFolderIter.next()
      : firstLevelFolder.createFolder(secondLevelFolderName);

    var thirdLevelFolderName =
      '[' + form.praktikum + ' ' + semester + '] Pekan-' + form.pekan; // ----[PBO GENAP 18/19] Pekan-1
    var thirdLevelFolderIter = dApp.getFoldersByName(thirdLevelFolderName);
    var thirdLevelFolder = thirdLevelFolderIter.hasNext()
      ? thirdLevelFolderIter.next()
      : secondLevelFolder.createFolder(thirdLevelFolderName);

    var fourthLevelFolderName =
      '[' +
      form.praktikum +
      '-' +
      form.pekan +
      ' ' +
      semester +
      '] ' +
      form.kelas; // ------[PBO-1 GENAP 18/19] IF-40-10
    var fourthLevelFolderIter = dApp.getFoldersByName(fourthLevelFolderName);
    var fourthLevelFolder = fourthLevelFolderIter.hasNext()
      ? fourthLevelFolderIter.next()
      : thirdLevelFolder.createFolder(fourthLevelFolderName);

    var blob = form.bap;
    var file = fourthLevelFolder.createFile(blob);
    return (
      "Upload berhasil, folder dapat dilihat pada <a href='" +
      fourthLevelFolder.getUrl() +
      "' target='_blank'>" +
      fourthLevelFolder.getUrl() +
      '</a>. Terimakasih! :)'
    );
  } catch (error) {
    return error.toString();
  }
}
