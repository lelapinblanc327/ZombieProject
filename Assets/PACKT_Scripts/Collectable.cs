using UnityEngine;
using System.Collections;

public class Collectable : MonoBehaviour {
	public AudioClip sound;

	void OnTriggerEnter (Collider other)
	{
		if (sound)
		{
			AudioSource.PlayClipAtPoint(sound, transform.position);
		}
		
	}
}
