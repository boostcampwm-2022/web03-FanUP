import PlusIcon from '@icons/PlusIcon';
import { useInput } from '@hooks/useInput';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSubmitProfileImageMutation } from '@/services/file.service';
import { useGetUserQuery } from '@/services/user.service';
import Loading from '@atoms/Loading';
import { useSubmitArtistInfoMutation } from '@/services/artist.service';

const ArtistInfoFormWrapper = styled.div`
    /* width: 60vw;
    min-width: 500px; */
    width: 500px;
    padding: 40px;
    background: white;
    height: 100%;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h1 {
        font-weight: 700;
        font-size: 32px;
        margin-bottom: 40px;
    }
`;

export const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    section {
        display: flex;
        gap: 20px;
        label {
            font-size: 25px;
            font-weight: 700;
            min-width: 125px;
        }
    }
`;

export const ActivityNameInput = styled.input`
    padding: 10px 20px;
    background: ${({ theme }) => theme.LIGHT_GRAY};
    border: none;
    width: 275px;
    &:focus {
        outline: none;
    }
`;

export const ProfileAddBox = styled.div`
    input {
        display: none;
    }
    label {
        cursor: pointer;
        border: none;
        width: 275px;
        height: 275px;
        background: ${({ theme }) => theme.LIGHT_GRAY};
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const ProfileEditBox = styled.div`
    width: 275px;
    height: 275px;
    position: relative;
    img {
        width: 100%;
        height: 100%;
    }
    input {
        display: none;
    }
    label {
        cursor: pointer;
        border-radius: 8px;
        position: absolute;
        top: 10px;
        right: 10px;
        min-width: 0 !important;
        background: ${({ theme }) => theme.PRIMARY};
        color: white;
        border: none;
        padding: 5px 10px;
        font-size: 15px !important;
        &:hover {
            background: ${({ theme }) => theme.PRIMARY_DARK};
        }
    }
`;

export const SubmitButton = styled.button`
    cursor: pointer;
    border: none;
    background: ${({ theme }) => theme.PRIMARY};
    color: white;
    border-radius: 8px;
    padding: 10px 0;
    font-weight: 700;
    &:hover {
        background: ${({ theme }) => theme.PRIMARY_DARK};
    }
`;

const ArtistInfoForm = () => {
    const { data: userData, isLoading, refetch: refetchUserData } = useGetUserQuery();
    const [activityName, _, onChangeActivityName] = useInput();
    const [profileUrl, setProfileUrl] = useState('');
    const [submitAristInfo] = useSubmitArtistInfoMutation();
    const [submitProfileImageMutate] = useSubmitProfileImageMutation();

    const AddProfileImage = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const formData = new FormData();
            const userId = userData!.id;
            [].forEach.call(e.target.files, (f) => {
                formData.append('file', f);
            });
            try {
                const { data } = (await submitProfileImageMutate({ formData, userId })) as {
                    data: any;
                };
                setProfileUrl(data.link);
            } catch (err) {
                alert('에러가 발생했어요 ㅠㅠ');
            }
        },
        [userData]
    );

    const submit = useCallback(async () => {
        await submitAristInfo({ name: activityName, profileUrl });
        refetchUserData();
    }, [profileUrl, activityName]);

    if (isLoading) return <Loading />;
    return (
        <ArtistInfoFormWrapper>
            <div>
                <h1>아티스트 정보 {userData?.artistId ? '수정' : '등록'}</h1>
                <InputSection>
                    <section>
                        <label>활동명</label>
                        <ActivityNameInput
                            value={activityName}
                            onChange={onChangeActivityName}
                            placeholder="활동명을 입력해주세요"
                        />
                    </section>
                    <section>
                        <label>프로필 사진</label>
                        {profileUrl ? (
                            <ProfileEditBox>
                                <img src={profileUrl} alt="profile" />
                                <input id="file" onChange={AddProfileImage} type="file" />
                                <label htmlFor="file">수정</label>
                            </ProfileEditBox>
                        ) : (
                            <ProfileAddBox>
                                <input id="file" onChange={AddProfileImage} type="file" />
                                <label htmlFor="file">
                                    <PlusIcon />
                                </label>
                            </ProfileAddBox>
                        )}

                        {/* <input type="file" /> */}
                    </section>
                </InputSection>
            </div>
            <SubmitButton onClick={submit}>{userData?.artistId ? '수정' : '등록'}</SubmitButton>
        </ArtistInfoFormWrapper>
    );
};

export default ArtistInfoForm;
