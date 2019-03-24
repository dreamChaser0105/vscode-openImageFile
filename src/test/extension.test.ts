//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
import * as openImageFile from '../openImageFile';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
// import * as myExtension from '../extension';

// Defines a Mocha test suite to group tests of similar kind together
suite("Open Image File Tests", function () {

    // Defines a Mocha unit test
    test("resolve", function() {
        assert.equal(openImageFile.resolve("C:\\hoge1\\hoge2\\hoge3\\hoge4\\hoge5\\hoge6", "../../../path.png"),  "C:/hoge1/hoge2/hoge3/path.png");
		assert.equal(openImageFile.resolve("C:\\hoge1\\hoge2\\hoge3\\hoge4\\hoge5\\hoge6\\", "../../../path.png"),"C:/hoge1/hoge2/hoge3/path.png");
        
        assert.equal(openImageFile.resolve("C:\\hoge1\\hoge2\\hoge3\\hoge4\\hoge5\\hoge6", "path.png"),  "C:/hoge1/hoge2/hoge3/hoge4/hoge5/hoge6/path.png");
        assert.equal(openImageFile.resolve("C:\\hoge1\\hoge2\\hoge3\\hoge4\\hoge5\\hoge6\\", "path.png"),"C:/hoge1/hoge2/hoge3/hoge4/hoge5/hoge6/path.png");
        
		assert.equal(openImageFile.resolve("C:\\hoge1\\hoge2\\hoge3\\hoge4", "../../../path.png"),  "C:/hoge1/path.png");
        assert.equal(openImageFile.resolve("C:\\hoge1\\hoge2\\hoge3\\hoge4\\", "../../../path.png"),"C:/hoge1/path.png");
        
		assert.equal(openImageFile.resolve("C:\\hoge1\\hoge2\\hoge3", "../../../path.png"),  "C:/path.png");
        assert.equal(openImageFile.resolve("C:\\hoge1\\hoge2\\hoge3\\", "../../../path.png"),"C:/path.png");
        
		assert.equal(openImageFile.resolve("C:\\hoge1\\hoge2", "../../../path.png"),  "C:/path.png");
        assert.equal(openImageFile.resolve("C:\\hoge1\\hoge2\\", "../../../path.png"),"C:/path.png");
        
		assert.equal(openImageFile.resolve("C:", "../../../path.png"),  "C:/path.png");
		assert.equal(openImageFile.resolve("C:\\", "../../../path.png"),"C:/path.png");
    });

    test("getOpenApplication",  function(){
        assert.equal(openImageFile.getOpenApplication(),"mspaint.exe");
    });

    

});

