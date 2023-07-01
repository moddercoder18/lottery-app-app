import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Header from '../../components/header';
import MainContainer from '../../components/mainContainer';
import theme from '../../theme/resources';
import StringsOfLanguages from '../../utils/localization';
import {getPageContent} from '../../redux/actions';
import RenderHtml from 'react-native-render-html';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';

function StaticPage(props) {
  const route = useRoute();
  const defaultContent = {
    _id: '',
    name: '',
    userId: '',
    slug: '',
    content: {
      en: '',
      zh: '',
      ko: '',
    },
    isActive: true,
    createdAt: '',
    updatedAt: '',
    __v: 0,
  };
  const [content, setContent] = useState(defaultContent);
  const selectedLanguage = useSelector(state => state.user.selectedLanguage) || 'en';
  console.log('--route?.params?.slug', route?.params?.slug)
  useEffect(() => {
    const getContent = async () => {
      try {
        const content = await getPageContent(route?.params?.slug);
        setContent(content?.data || defaultContent);
      } catch (error) {
        console.log(error);
        setContent(defaultContent);
      }
    };
    if (route?.params?.slug) {
      getContent();
    }
  }, [route?.params?.slug]);
  console.log(content?.content)
  return (
    <MainContainer>
      <Header isBack={true} showSearch={false} />
      <View style={{padding: 20}}>
        <View>
          <RenderHtml contentWidth={'100%'} source={{
            html: content?.content && content?.content[selectedLanguage || 'en'] ? content?.content[selectedLanguage || 'en'] : (content?.content?.en || '')
          }} />
        </View>
      </View>
    </MainContainer>
  );
}

export default StaticPage;
