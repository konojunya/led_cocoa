#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>
#include <fcntl.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <wiringPi.h>
#define servo 18
#define pwm   25
#define high  23
#define low   24
/*
    前進
        23 high
        24 low
    後退
        23 low
        24 high
*/
int main ( int argc, char const *argv[] )
{
    char s[300];
    char slope[5];
    char speed[4];
    int  speed_int;
    int  slope_int = 0;
    int  num, fd;
    int  index  = 0;
    int  index2 = 0;
    int  pid    = 0;

    wiringPiSetupGpio( );
    /* 名前付きパイプをなければ作成 */
    mknod( "myfifo", S_IFIFO | 0666, 0 );
    printf( "セットアップ\n" );
    pinMode( servo, PWM_OUTPUT );
    pwmSetMode( PWM_MODE_MS );
    pwmSetClock( 400 );
    pwmSetRange( 1024 );
    softPwmCreate( pwm, 0, 100 );
    pinMode( low, OUTPUT );
    digitalWrite( low, 0 );
    pinMode( high, OUTPUT );
    digitalWrite( high, 1 );

    /*
      別プロセスが名前付きパイプの反対側を書き込み用に開くまでこのプロセス
      は待機する..
    */
    printf( "送信プロセスを待っています...\n" );
    fd = open( "myfifo", O_RDONLY );
    printf( "送信プロセスが名前付きパイプを開きました\n" );

    do {
        /* パイプに何かが書き込まれるまでここで処理が一度止まる */
        if(( num = read( fd, s, 300 )) == -1 ) {
            perror( "read" );
        }
        else {
            s[num] = '\0';
            printf( "%s\n", s );
            memset( &slope[0], 0, sizeof( slope ) );
            for( index = 0 ; index < 5 ; index++ ) {
                if( s[index] == ',' ) {
                    slope[index] = '\0';
                    break;
                }
                slope[index] = s[index];
            }
            slope_int = atoi( &slope[0] );
            /* 文字処理-------------------------------------------------- */
            index2 = 0;
            memset( &speed[0], 0, sizeof( speed ) );
            for( index = index + 1 ; index < 10 ; index++ ) {
                if( s[index] == '\0' ) {
                    speed[index] = '\0';
                    break;
                }
                speed[index2] = s[index];
                index2++;
            }
            /* 数値に変換------------------------------------------------ */
            speed_int = atoi( &speed[0] );
			if( speed_int == 39 ) {
				digitalWrite( high, 0 );
				digitalWrite( low, 1 );
				speed_int = 50;
			} else {
				digitalWrite( high, 1 );
				digitalWrite( low, 0 );
			}
            /* 40なら0に */
            if( speed_int <= 40 ) {
                speed_int = 0;
            }
            /* 傾きをサーボに-------------------------------------------- */
            slope_int /= 2;
            slope_int += 70;
            if( slope_int > 90 ) {
                slope_int = 90;
            }
            if( slope_int < 40 ) {
                slope_int = 40;
            }
            /* 出力------------------------------------------------------ */
            softPwmWrite( pwm, speed_int );
            pwmWrite( servo, slope_int );
            printf( "サーボ：%d  スピード:%d\n", slope_int, speed_int );
        }
    } while( num > 0 );
    wiringPiSetupGpio( );

    return 0;
}
