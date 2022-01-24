import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import {
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';


import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionButtons
} from './styles';
import { useAuth } from '../../hooks/auth';

type TransactionType = "income" | "outcome";

interface FormData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    amount: Yup
        .number()
        .typeError('Informe um valor numérico')
        .positive('Informe um valor positivo')
        .required('O valor é obrigatório'),
});

export function Register(): JSX.Element {
    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria"
    });
    const [transactionType, setTransactionType] = useState('' as TransactionType);
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const navigation = useNavigation();
    const { user } = useAuth();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionType(type: TransactionType): void {
        setTransactionType(type);
    }

    function handleCloseSelectCategoey() {
        setCategoryModalOpen(false);
    }

    function handleCategorySelectButtonClick() {
        setCategoryModalOpen(true);
    }

    async function handleRegister(form: FormData) {
        if (!transactionType)
            return Alert.alert('Erro', 'Selecione o tipo de transação');

        if (category.key === "category")
            return Alert.alert('Erro', 'Selecione uma categoria');

        const newTransaction = {
            id: String(uuid.v4()),
            title: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }
        try {

            const dataKey = `@gofinance:transactions_user:${user.id}`;
            const transactions = await AsyncStorage.getItem(dataKey);
            const parsedTransactions = transactions ? JSON.parse(transactions) : [];
            const formattedTransactions = [...parsedTransactions, newTransaction];
            await AsyncStorage.setItem(
                dataKey,
                JSON.stringify(formattedTransactions)
            );

            reset();
            setTransactionType('' as TransactionType);
            setCategory({
                key: "category",
                name: "Categoria"
            });

            navigation.navigate('Listagem' as never);

        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível salvar a transação");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            placeholder="Nome"
                            name="name"
                            control={control}
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name='amount'
                            control={control}
                            placeholder="Preço"
                            keyboardType='numeric'
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionButtons>
                            <TransactionTypeButton
                                title="Income"
                                type="income"
                                onPress={() => handleTransactionType('income')}
                                isActive={transactionType === 'income'}
                            />
                            <TransactionTypeButton
                                title="Outcome"
                                type="outcome"
                                onPress={() => handleTransactionType('outcome')}
                                isActive={transactionType === 'outcome'}
                            />
                        </TransactionButtons>

                        <CategorySelectButton
                            title={category.name}
                            onPress={handleCategorySelectButtonClick}
                        />

                    </Fields>
                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoey}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}
