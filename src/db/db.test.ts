import { expect } from 'chai';

import { databaseTest } from './db'
import {guaranteeProjectExistsInDb} from "../coderevue/project";
import {processPossibleNewGitLabCommit} from "../coderevue/gitlab-commit";

describe('db', () => {

    it('db', async () => {

        // await databaseTest();

        // await guaranteeProjectExistsInDb(2);
        // await processPossibleNewGitLabCommit(2, 'refs/heads/master', "024aebaa10b213bbba034ebf2eba0341e4aca6bf");

        expect(1).to.deep.equal(1);

    }).timeout(10 * 1000);

});