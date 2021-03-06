import {Request} from 'express';
import {UserEntity} from '../entities/UserEntity';
import {TokenEntity} from '../entities/TokenEntity';
import {PlaylistEntity} from '../entities/PlaylistEntity';
import {MediaItemEntity} from '../entities/MediaItemEntity';

export interface IRequest extends Request {
    data: any;
    localMediaStore: any;
    userStore: UserEntity;
    tokenStore: TokenEntity;
    playlistStore: PlaylistEntity;
    playlistItemStore: PlaylistEntity[];
    youTubeStore: any;
    youTubePlaylistStore: any;
    googleStore: any;
    mediaItemStore: MediaItemEntity;
    mediaItemsStore: MediaItemEntity[];
    googleProfileStore: any;
    googleDriveStore: any;
}
