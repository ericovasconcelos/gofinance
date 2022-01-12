import React from 'react';
import { FlatList, Text } from 'react-native';
import { Button } from '../../components/Form/Button';
import { categories } from '../../utils/categories';

import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer
} from './styles';

interface Category {
    key: string;
    name: string;
    icon?: string;
}

interface Props {
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory
}: Props) {

    function handleCategorySelect(item: Category) {
        setCategory(item);
    }

    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>

            <FlatList
                data={categories}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item: Category) => item.key}
                renderItem={({ item }: { item: Category }) => (
                    <Category
                        onPress={() => handleCategorySelect(item)}
                        isActive={item.key === category.key}
                    >
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button
                    title="Selectionar"
                    onPress={closeSelectCategory}
                />
            </Footer>

        </Container>
    );
}