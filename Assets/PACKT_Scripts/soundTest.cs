using UnityEngine;
using System.Collections;

public class soundTest : MonoBehaviour {
	public AudioClip otherClip;

	void Start () 
	{
		AudioSource audio = GetComponent<AudioSource>();
		audio.clip = otherClip;
		audio.Play();
	}

}
