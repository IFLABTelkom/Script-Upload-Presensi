// The script is deployed as a web app and renders the form
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index.html')
    .setSandboxMode(HtmlService.SandboxMode.NATIVE) // This is important as file upload fail in IFRAME Sandbox mode.
    .setTitle('Form Upload Presensi')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // To allow this script to be iframe-d on other website.
}

// This function will process the submitted form
function uploadFiles(form) {
  var dApp = DriveApp;
  var semester = 'GENAP 18/19';
  try {
    var firstFolderName = 'PRESENSI PRAKTIKUM ' + semester; // PRESENSI PRAKTIKUM GENAP 18/19
    var firstLevelFolderIter = dApp.getFoldersByName(firstFolderName);
    var firstLevelFolder = firstLevelFolderIter.hasNext()
      ? firstLevelFolderIter.next()
      : dApp
          .createFolder(firstFolderName)
          .setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);

    var secondLevelFolderName = '[' + semester + '] ' + form.praktikum; // --[GENAP 18/19] PBO
    var secondLevelFolderIter = dApp.getFoldersByName(secondLevelFolderName);
    var secondLevelFolder = secondLevelFolderIter.hasNext()
      ? secondLevelFolderIter.next()
      : firstLevelFolder
          .createFolder(secondLevelFolderName)
          .setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);

    var thirdLevelFolderName =
      '[' + form.praktikum + ' ' + semester + '] Pekan-' + form.pekan; // ----[PBO GENAP 18/19] Pekan-1
    var thirdLevelFolderIter = dApp.getFoldersByName(thirdLevelFolderName);
    var thirdLevelFolder = thirdLevelFolderIter.hasNext()
      ? thirdLevelFolderIter.next()
      : secondLevelFolder
          .createFolder(thirdLevelFolderName)
          .setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);

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
      : thirdLevelFolder
          .createFolder(fourthLevelFolderName)
          .setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);

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
