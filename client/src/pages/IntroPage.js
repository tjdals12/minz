import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import InfoContainer from 'containers/common/InfoContainer';
import IntroductionWrapper from 'components/introduction/IntroductionWrapper';
import IntroductionContainer from 'containers/introduction/IntroductionContainer';
import Website from 'components/introduction/Website';

const IntroPage = () => (
    <PageTemplate>
        <InfoContainer current="intro"/>
        <IntroductionWrapper>
            <IntroductionContainer />
            <Website />
        </IntroductionWrapper>
    </PageTemplate>
)

export default IntroPage;