import React, {FunctionComponent} from 'react';

import {TouchableOpacity, View, TextInput} from '../rn-styled';
import {MagnifyingGlassIcon} from 'react-native-heroicons/solid';
import {APPLICATION_CONSTANTS, TEST_IDS} from '../../helpers/constants';

export type HeaderProps = {
  handleSearch: (value: string) => void;
  toggleSearch: boolean;
  setToggleSearch: (val: boolean) => void;
};

const Header: FunctionComponent<HeaderProps> = ({
  handleSearch,
  toggleSearch,
  setToggleSearch,
}) => {
  return (
    <View
      className={`flex-row justify-end items-center rounded-full ${
        toggleSearch ? 'bg-[#ffffff]' : 'bg-transparent'
      }`}>
      {toggleSearch ? (
        <TextInput
          onChangeText={handleSearch}
          placeholder={APPLICATION_CONSTANTS.SEARCH_CITY_PLACEHOLDER}
          placeholderTextColor="black"
          className="pl-6 h-10 pb-1 flex-1 text-base text-black"
        />
      ) : null}
      <TouchableOpacity
        onPress={() => setToggleSearch(!toggleSearch)}
        testID={TEST_IDS.SEARCH_BUTTON}
        className="rounded-full p-3 m-1">
        <MagnifyingGlassIcon testID={TEST_IDS.SEARCH_ICON} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
