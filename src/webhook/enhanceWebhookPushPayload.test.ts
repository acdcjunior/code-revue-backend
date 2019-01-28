import { expect } from 'chai';
import enhanceWebhookPushPayload from "./enhanceWebhookPushPayload";

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const axiosMock = new MockAdapter(axios);

import { ImportMock } from 'ts-mock-imports';
import * as serverConfigModule from '../coderevue/server-config';

ImportMock.mockFunction(serverConfigModule, 'gitLabServerInfo', {
    gitlabServerUrl: 'http://c3prgitlab:8888',
    gitlabApiToken: 'x'
});

describe('enhanceWebhookPushPayload', () => {

    it('enhanceWebhookPushPayload', async () => {
        axiosMock.onGet(`http://c3prgitlab:8888/api/v4/projects/2/repository/commits/024aebaa10b213bbba034ebf2eba0341e4aca6bf/diff`).reply(200, [{"old_path":"src/main/java/io/github/c3pr/sample/javamaven/walkmod/IssueUseStringEquals.java","new_path":"src/main/java/io/github/c3pr/sample/javamaven/walkmod/IssueUseStringEquals.java","a_mode":"100644","b_mode":"100644","new_file":false,"renamed_file":false,"deleted_file":false,"diff":"@@ -5,7 +5,7 @@ public class IssueUseStringEquals {\n     public static void main(String[] args) {\n         String blueHardcoded = \"blue\";\n         String blueViaConstructor = new String(\"blue\");\n-\n+//xcvzxcvc\n \n         //region COVERED BY CURRENT sonar:UseStringEquals\n         if (blueHardcoded == \"blue\") {\n"}]);
        axiosMock.onGet(`http://c3prgitlab:8888/api/v4/projects/2/repository/commits/80f8374670976719c6566e8db6338a399cd5db27/diff`).reply(200, [{"old_path":"src/main/java/io/github/c3pr/sample/javamaven/walkmod/PrimitiveInstantiationForToString.java","new_path":"src/main/java/io/github/c3pr/sample/javamaven/walkmod/PrimitiveInstantiationForToString.java","a_mode":"0","b_mode":"100644","new_file":true,"renamed_file":false,"deleted_file":false,"diff":"@@ -0,0 +1,12 @@\n+package io.github.c3pr.sample.javamaven.walkmod;\n+\n+public class PrimitiveInstantiationForToString {\n+\n+    public String primitiveInstantiationForToString(int myInt) {\n+        new Integer(myInt).toString();\n+        new Integer(myInt+\"\").toString();\n+\n+        return \"\" + myInt;\n+    }\n+\n+}\n"}]);
        axiosMock.onGet(`http://c3prgitlab:8888/api/v4/projects/2/repository/commits/802836dece83b10eeb9ac8920ef7acf329332cd9/diff`).reply(200, [{"old_path":"src/main/java/io/github/c3pr/sample/javamaven/walkmod/ArrayDesignatorOnType.java","new_path":"src/main/java/io/github/c3pr/sample/javamaven/walkmod/ArrayDesignatorOnType.java","a_mode":"0","b_mode":"100644","new_file":true,"renamed_file":false,"deleted_file":false,"diff":"@@ -0,0 +1,11 @@\n+package io.github.c3pr.sample.javamaven.walkmod;\n+\n+public class ArrayDesignatorOnType {\n+\n+    public String arrayDesignatorOnType(String yay) {\n+        int matrix[][];\n+\n+        return \"\" + yay;\n+    }\n+\n+}\n"}]);

        const input = require('../gitlab/types/GitLabPush/push.webhook.json');
        const expectedOutput = require('../gitlab/types/GitLabPush/push.webhook.modifiedByCodeRevue.json');

        let actualOutput = await enhanceWebhookPushPayload(input);

        expect(actualOutput).to.deep.equal(expectedOutput);

    }).timeout(10 * 1000);

});