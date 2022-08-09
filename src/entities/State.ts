/**
 * 飞机的状态
 * 
 * 每个时刻飞机只能处于1种状态，无敌状态和隐身状态默认包含普通状态
 */
 export enum State {

    /**
     * 普通状态
     * */
    ACTIVE = "active",

    /**
     * 爆炸状态
     * */
    BOOM = "boom",

    /**
     * 死亡状态
     * */
    DEAD = "dead",
    
    /**
     * 无敌状态(子弹不可穿过)
     * */
    Invincible = "invincible",

    /**
     * 隐身状态(子弹可以穿过)
     * */
    Hidden = "hidden"
    
};